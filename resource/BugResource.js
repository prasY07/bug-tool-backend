
export const bugResource = async (allBugs) => {
   const bugs = await Promise.all(
     allBugs.map(async (singleBug) => {
       return {
         id: singleBug._id,
         title: singleBug.title,
         description: singleBug.description,
         status: singleBug.status,
         assigned_by: singleBug.assigned_by,
         assigned_to: singleBug.assigned_to,
       };
     })
   );
 
   return bugs;
 };




export const userShortResource = async (allUsers) => {
  const users = await Promise.all(
    allUsers.map(async (singleBug) => {
      return {
        id: singleBug._id,
        name: singleBug.name,
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



