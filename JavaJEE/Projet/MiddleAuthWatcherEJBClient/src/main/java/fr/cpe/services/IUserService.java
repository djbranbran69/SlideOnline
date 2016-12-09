package fr.cpe.services;

import fr.cpe.models.User;

import javax.ejb.EJB;
import javax.ejb.Local;

/**
 * Created by djbranbran on 09/12/2016.
 */
@Local
public interface IUserService {

    User searchUser(User user);
}
