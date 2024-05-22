import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs'

export const adminSeeder = async() => {


var hashPassword = bcrypt.hashSync('12345678');
let existingAdmin;
existingAdmin = await Admin.findOne({email:'admin@admin.com'});
if(!existingAdmin){
    const adminInfo = new Admin({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: hashPassword, // You should hash the password
      });
      adminInfo.save();
}
}


