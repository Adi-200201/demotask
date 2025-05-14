export const syncPostToServer = async (post) => {
  // Simulate API call delay
  await new Promise((res) => setTimeout(res, 1000));
  return { success: true };
};
