const yargs = require('yargs');
const child = require('child_process');
const key = 123;

const argv = yargs
  .command(
    'upload',
    'Comando para levantar servidor',
    {
      key: {
        describe: 'Codigo Levantar Server',
        demand: true,
        alias: 'k',
      },
    },
    (args) => {
      args.key == key
        ? child.exec('node acceso.js', (err, stdout) => {
            err ? console.log(err) : console.log(stdout);
          })
        : console.log('Codigo Incorrecto!');
    }
  )
  .help().argv;
