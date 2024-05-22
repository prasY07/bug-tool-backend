
export const userResource = async (allExams) => {
   const users = await Promise.all(
     allExams.map(async (singleUser) => {
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


export const userShortResource = async (allExams) => {
  const users = await Promise.all(
    allExams.map(async (singleUser) => {
      return {
        id: singleUser._id,
        name: singleUser.name,
      };
    })
  );

  return users;
};
 

export const singleUserResource = async(singleUser) => {
      return {
         id: singleUser._id, 
         name: singleUser.name, 
         email: singleUser.email, 
         status: singleUser.status, 
      };
}
