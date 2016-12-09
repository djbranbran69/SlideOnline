package fr.cpe.ejb;

import fr.cpe.models.User;

/**
 * Created by djbranbran on 09/12/2016.
 */
public interface IMessageReceiver {

    /**
     * Receive an user
     * @return
     */
    User receiveMessage();
}
