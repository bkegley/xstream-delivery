import React from "react";
import { Formik, Form, Field } from "formik";
import { useLazyFetch } from "../../utils/useLazyFetch";

export const CreatePewForm = () => {
  const [fetch, { error, loading, data }] = useLazyFetch("");
  console.log({ error, loading, data });
  return (
    <Formik
      initialValues={{
        command: "",
        cost: 0,
        fieldModified: "baseHealth",
        modifierType: "percent",
        duration: 0,
        effectType: "immediate",
        description: "",
      }}
      onSubmit={(values) => {
        fetch("http://localhost:4000/pews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }}
    >
      {() => {
        return (
          <Form>
            <div>
              <div>
                <label htmlFor="command">Command</label>
                <Field
                  name="command"
                  id="command"
                  type="text"
                  className="border"
                />
              </div>
              <div>
                <label htmlFor="cost">Cost</label>
                <Field name="cost" id="cost" type="number" className="border" />
              </div>
              <div>
                <label htmlFor="fieldModified">Field Modified</label>
                <Field
                  name="fieldModified"
                  id="fieldModified"
                  as="select"
                  className="border"
                >
                  <option value="baseHealth">Base Health</option>
                  <option value="baseSpeed">Base Speed</option>
                </Field>
              </div>
              <div>
                <label htmlFor="modifierType">Modified Type</label>
                <Field name="modifierType" id="modifierType" as="select">
                  <option value="percent">Percent</option>
                  <option value="value">Value</option>
                  <option value="changeValue">Change Value</option>
                </Field>
              </div>
              <div>
                <label htmlFor="duration">Duration</label>
                <Field name="duration" id="duration" type="number" />
              </div>
              <div>
                <label htmlFor="effectType">Effect Type</label>
                <Field name="effectType" id="effectType" as="select">
                  <option value="immediate">Immediate</option>
                  <option value="missile">Missile</option>
                </Field>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  id="description"
                  type="text"
                  className="border"
                />
              </div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
