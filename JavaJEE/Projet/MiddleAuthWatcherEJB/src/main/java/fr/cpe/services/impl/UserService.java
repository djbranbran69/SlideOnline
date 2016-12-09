package fr.cpe.services.impl;

import fr.cpe.dao.impl.UserDao;
import fr.cpe.models.User;
import fr.cpe.services.IUserService;

import javax.ejb.Stateless;

/**
 * Created by djbranbran on 08/12/2016.
 */
@Stateless
public class UserService implements IUserService {


    UserDao userDao;

    @Override
    public User searchUser(User user) {
        return userDao.searchUser(user.getLogin(), user.getPassword());
    }
}
