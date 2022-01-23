import React, { useState } from "react";
import {
  ContextualMenu,
  IContextualMenuProps,
  IIconProps,
} from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { getTheme } from "@fluentui/react";

import "../App.css";

const theme = getTheme();

const stackTokens = { childrenGap: 50 };
const iconProps = { iconName: "Calendar" };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const InputForm = () => {
  const [title, setTitle] = useState("");

  return (
    <div class="center">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField
            placeholder="please enter a query"
            label="Required "
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <DefaultButton
            onClick={async () => {
              const query = { title };
              const response = await fetch("http://localhost:5000/input", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
              });

              console.log(query.title);

              if (response.ok) {
                console.log("response worked!");
              }
            }}
          >
            submit
          </DefaultButton>
        </Stack>
      </Stack>
    </div>
  );
};
