'use client';

import { Button, Modal, Form } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerApi } from '@/hooks/useServerApi.js';
import { MdEdit } from 'react-icons/md';

const validationSchema = Yup.object().shape({
  roleId: Yup.string().required('Role Required'),
});

export default function AssignRoleModal({ user, roles = [] }) {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const apiClient = useServerApi();

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const assignRoleMutation = useMutation({
    mutationFn: async ({ values, formikProps }) => {
      try {
        return await apiClient.updateAuthUser(user.id, {
          roleId: values.roleId,
        });
      } finally {
        formikProps.setSubmitting(false);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth-users'] });
      handleClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="p-0 ms-2 align-baseline"
        onClick={() => setShowModal(true)}
        aria-label={`Edit role for ${user.username}`}
      >
        <MdEdit />
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{ roleId: user.roleId ?? '' }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, formikProps) =>
            assignRoleMutation.mutate({ values, formikProps })
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="d-flex flex-column gap-3">
                <div>
                  Assign a new role to <strong>{user.username}</strong>.
                </div>
                <Form.Group controlId="assign-role-select">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="roleId"
                    value={values.roleId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={Boolean(errors.roleId)}
                  >
                    <option value={0}>None</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.roleName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.roleId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Save
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
