const { exec } = require('child_process');

const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
const migrationName = process.argv[2] || 'migration';
const fullMigrationName = `${timestamp}-${migrationName}`;

exec(`npx sequelize-cli migration:create --name ${fullMigrationName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating migration: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});