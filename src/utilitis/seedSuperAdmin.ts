/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../modules/user/user.model';

export const seedSuperAdmin = async () => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    console.log(email, password);

    const isAdminExist = await User.findOne({ email: email });
    if (isAdminExist) {
      console.log('Admin Already Created');
      return;
    }

    const userData = {
      name: 'Admin',
      email: email,
      password: password,
      role: 'admin',
    };
    const superAdminCreated = await User.create(userData);
    console.log('Super Admin Created Successfuly! \n');
    console.log(superAdminCreated);
  } catch (error) {
    console.log(error);
  }
  console.log('admin');
};
