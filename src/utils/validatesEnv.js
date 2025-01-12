const validateEnvVariables = (async = (envVars = []) => {
  const defaultrequiredEnvVariables = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_DATABASE",
    "DB_PORT",
    "PORT",
    "JWT_SECRET",
  ];
  const requiredEnvVariables = envVars.length
    ? envVars
    : defaultrequiredEnvVariables;

  const missingVars = requiredEnvVariables.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    return {
      success: false,
      message: `The following environment variables are missing: ${missingVars.join(
        ", "
      )}`,
    };
  }
  return { success: true, message: "All environment variables are set." };
});

module.exports = validateEnvVariables;
