export const getHealthCheck = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api`);
    if (response.ok) return await response.json();
    throw new Error(response.message);
  } catch (error) {
    new Error(error.message);
  }
};
