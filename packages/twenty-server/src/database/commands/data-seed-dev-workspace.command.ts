import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Command, CommandRunner, Option } from 'nest-commander';
import { Repository } from 'typeorm';

import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import { WorkspaceService } from 'src/engine/core-modules/workspace/services/workspace.service';
import {
  SEED_APPLE_WORKSPACE_ID,
  SEED_YCOMBINATOR_WORKSPACE_ID,
} from 'src/engine/workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant';
import { DevSeederService } from 'src/engine/workspace-manager/dev-seeder/services/dev-seeder.service';

type SeedWorkspaceCommandOptions = {
  reset?: boolean;
};

@Command({
  name: 'workspace:seed:dev',
  description:
    'Seed workspace with initial data. This command is intended for development only.',
})
export class DataSeedWorkspaceCommand extends CommandRunner {
  workspaceIds = [
    SEED_APPLE_WORKSPACE_ID,
    SEED_YCOMBINATOR_WORKSPACE_ID,
  ] as const;
  private readonly logger = new Logger(DataSeedWorkspaceCommand.name);

  constructor(
    private readonly devSeederService: DevSeederService,
    private readonly workspaceService: WorkspaceService,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
  ) {
    super();
  }

  @Option({
    flags: '-r, --reset',
    description: 'Delete existing seeded workspaces before seeding them again',
    required: false,
  })
  parseReset(): boolean {
    return true;
  }

  async run(
    _passedParams: string[],
    options: SeedWorkspaceCommandOptions,
  ): Promise<void> {
    try {
      for (const workspaceId of this.workspaceIds) {
        const existingWorkspace = await this.workspaceRepository.findOne({
          where: { id: workspaceId },
          withDeleted: true,
        });

        if (existingWorkspace) {
          if (!options.reset) {
            throw new Error(
              `Seeded workspace ${workspaceId} already exists. Run "workspace:seed:dev --reset" to recreate the dev workspaces from a clean state.`,
            );
          }

          this.logger.log(
            `Deleting existing seeded workspace ${workspaceId} before reseeding`,
          );

          await this.workspaceService.deleteWorkspace(workspaceId);
        }

        await this.devSeederService.seedDev(workspaceId);
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.stack);
    }
  }
}
