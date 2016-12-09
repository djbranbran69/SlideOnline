package fr.cpe.rest;

import fr.cpe.models.User;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Created by djbranbran on 08/12/2016.
 */
@Path("/WatcherAuth")
public interface IConnect {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/connect/")
    User connection(User user);

}
