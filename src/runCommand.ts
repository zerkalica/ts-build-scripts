import { createContextYargs } from './context'
import { buildCommand, cleanCommand, watchCommand } from './commands'

export async function runCommand() {
  const yargs = await createContextYargs()

  const commands = yargs
    .command(buildCommand)
    .command(watchCommand)
    .command(cleanCommand)
    .help()

  const argv = commands.parse()
  console.log(argv._[0], argv.lib ? 'library' : 'application', argv.projectDir)
  if (argv._.length === 0) commands.showHelp()
}

export type Config = Partial<
  Parameters<typeof buildCommand['handler']>[0] &
    Parameters<typeof watchCommand['handler']>[0] &
    Parameters<typeof cleanCommand['handler']>[0]
>
