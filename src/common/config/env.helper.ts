export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  console.log('NODE_ENV--->', env);
  const envFile = '.env.dev';

  return `${dest}/${envFile}`;
}
