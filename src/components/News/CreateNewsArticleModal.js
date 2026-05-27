'use client';

import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerApi } from '../../hooks/useServerApi.js';

const FIELD_DEFAULTS = {
  title: '',
  content: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title Required')
    .max(31, 'Title cannot exceed ${max} characters'),
  content: Yup.string()
    .required('Content Required')
    .max(412, 'Content cannot exceed ${max} characters'),
});

export default function CreateNewsArticleModal() {
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();
  const apiClient = useServerApi();

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const createPostMutation = useMutation({
    mutationFn: async ({ values, formikProps }) => {
      try {
        return await apiClient.createNewsArticle(values);
      } finally {
        formikProps.setSubmitting(false);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news-articles'] });
      handleClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        New
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add News Article</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={FIELD_DEFAULTS}
          validationSchema={validationSchema}
          onSubmit={(values, formikProps) =>
            createPostMutation.mutate({ values, formikProps })
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="d-flex flex-column gap-3">
                <InputGroup hasValidation>
                  <Form.Control
                    id="news-title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </InputGroup>
                <InputGroup hasValidation>
                  <Form.Control
                    id="news-content"
                    name="content"
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="What's on your mind?"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.content}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit" disabled={!isValid}>
                  Create News
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
