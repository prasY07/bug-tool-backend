
export const userResource = async (allUers) => {
   const users = await Promise.all(
     allUers.map(async (singleUser) => {
      //  const questions = await questionShortResource(singleUser.questions);
       return {
         id: singleUser._id,
         name: singleUser.name,
         email: singleUser.email,
         status: singleUser.status
       };
     })
   );
 
   return users;
 };




export const userShortResource = async (allUsers) => {
  const users = await Promise.all(
    allUsers.map(async (singleUser) => {
      return {
        id: singleUser._id,
        name: singleUser.name,
      };
    })
  );

  return users;
};
 

export const singleBugResource = async(bug) => {
      return {
         id: bug._id, 
         name: bug.name, 
         email: bug.email, 
         status: bug.status, 
         roles: bug.roles, 
      };
}



