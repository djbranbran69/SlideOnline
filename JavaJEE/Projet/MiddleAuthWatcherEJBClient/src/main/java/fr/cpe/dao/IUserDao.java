package fr.cpe.dao;

import fr.cpe.models.User;

/**
 * Created by djbranbran on 08/12/2016.
 */
public interface IUserDao extends IGenericDAO<User> {

    /**
     * Search a user by login / password
     * @param login
     * @param pwd
     * @return
     */
    User searchUser(String login, String pwd);



}

