package fr.cpe.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

/**
 * Created by djbranbran on 08/12/2016.
 */
public interface IGenericDAO<T> {

    EntityManager em();

    void create(final T entity);

    void update(final T entity);

    void delete(final T entity);

}
