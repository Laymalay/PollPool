import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { createPollMutation } from "../../schema/mutations";
import { getAllPollsQuery } from "../../schema/queries";

export const CreatePoll = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createPoll = useMutation(createPollMutation);
  console.log("sdfsdf");
  const onSubmit = () => {
    // e.preventDefault();
    createPoll({
      variables: {
        title,
        description
      },
      update: (cache, { data: { createPoll: createPollData } }) => {
        const queryParams = { query: getAllPollsQuery };
        const dataQuery = cache.readQuery(queryParams);

        const newPollData = { ...createPollData };

        cache.writeQuery({
          ...queryParams,
          data: {
            ...dataQuery,
            polls: {
              ...dataQuery.polls,
              polls: [newPollData, ...dataQuery.polls]
            }
          }
        });
      }
    })
      .then(() => {
        // add notification
        console.log("then");
      })
      .catch(async err => {
        console.log("error");
      });
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="A title for the poll"
        />
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="The description for the poll"
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default CreatePoll;
