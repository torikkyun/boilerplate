import { CommandFactory } from 'nest-commander';
import { CommandModule } from '@commands/command.module';

async function bootstrap() {
  await CommandFactory.run(CommandModule);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
