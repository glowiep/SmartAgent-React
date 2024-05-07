import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import DraftEditor from "./DraftEditor";
import DOMPurify from "dompurify";

function RequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    customer_name: Yup.string().required("Name is required"),
    from_email: Yup.string().required("Email is required"),
    title: Yup.string().required("Title is required"),
    body: Yup.string()
      .transform((value) => {
        // Transform the HTML content if needed (e.g., removing certain tags)
        return DOMPurify.sanitize(value);
      })
      .required("A description of your request is required"),
  });

  const handleSubmit = (values, actions) => {
    let formData = new FormData();
    formData.append("ticket[customer_name]", values.customer_name);
    formData.append("ticket[from_email]", values.from_email);
    formData.append("ticket[title]", values.title);
    formData.append("ticket[body]", values.body);
    formData.append("ticket[status_id]", values.status_id);
    formData.append("ticket[agent_id]", values.agent_id);
    // Assuming 'attachments' is the file to be uploaded
    if (values.attachments) {
      Array.from(values.attachments).forEach((file ) => {
        formData.append(`ticket[attachments][]`, file);
      });
    }
    console.log("Form data:", formData);
    axios
      .post("api/v1/tickets", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Form submission successful:", response.data);
        // alert("Form submitted successfully!");
        setSubmitted(true);
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // alert("Error submitting form!");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };
  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-md m-5 bg-white dark:bg-gray-900">
      {submitted ? ( // Conditional rendering for thank you message
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Thank you for your support request.
          </h1>
          <p className="text-2xl">
            You will receive our response by email within 2 business days.
          </p>
          <button
                  type="submit"
                  className="mt-10 bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
                  onClick={() => setSubmitted(false)}
                >
                  New Request
                </button>
        </div>
      ) : (
        <div>
          <h1 className="m-5 text-4xl font-bold dark:text-white">
            Customer Support Request Form
          </h1>
          <Formik
            initialValues={{
              customer_name: "",
              from_email: "",
              title: "",
              body: "",
              status_id: 1,
              agent_id: 1,
              attachments: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form encType="multipart/form-data">
                <div className="mb-4">
                  <label
                    htmlFor="customer_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <Field
                    name="customer_name"
                    id="customer_name"
                    type="text"
                    placeholder="Name"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:text-white"
                  />
                  <ErrorMessage
                    name="customer_name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="from_email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <Field
                    name="from_email"
                    id="from_email"
                    type="from_email"
                    placeholder="your-email@email.com"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500  dark:text-white"
                  />
                  <ErrorMessage
                    name="from_email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Title
                  </label>
                  <Field
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500  dark:text-white"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="body"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Request
                  </label>
                  <Field name="body">
                    {({ field }) => (
                      <DraftEditor
                        value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="body"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <Field name="attachments">
                  {({ form }) => (
                    <div>
                      <input
                        id="attachments"
                        name="attachments"
                        type="file"
                        multiple
                        className="form-control block w-full py-2 dark:text-white cursor-pointer font-normal text-gray-700 dark:text-gray-300"
                        onChange={(event) => {
                          const files = event.currentTarget.files;
                          form.setFieldValue("attachments", files);
                        }}
                      />
                    </div>
                  )}
                </Field>
                <button
                  type="submit"
                  className="mt-10 bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default RequestForm;
