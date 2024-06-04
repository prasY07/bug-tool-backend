import Role from '../models/Role.js';

export const RoleSeeder = async () => {
  const all_roles = [
    {
      slug: "tester",
      name: "Tester",
    },
    {
      slug: "business_team",
      name: "Business Team",
    },
    {
      slug: "developer",
      name: "Developer",
    },
  ];

  for (const role of all_roles) {
    const checkRole = await Role.findOne({ slug: role.slug });

    if (!checkRole) {
      const newRole = new Role({
        name: role.name,
        slug: role.slug,
      });
      await newRole.save();
    }
  }
};
