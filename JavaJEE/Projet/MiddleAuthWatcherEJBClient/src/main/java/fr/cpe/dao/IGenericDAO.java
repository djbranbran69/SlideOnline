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

    /**
     * Insert entity
     * @param entity
     */
    void create(final T entity);

    /**
     * Update entity
     * @param entity
     */
    void update(final T entity);

    /**
     * Delete entity
     * @param entity
     */
    void delete(final T entity);

}
