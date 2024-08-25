# Features

## **Core CRUD Functionality**
  * **Create**: Users can add new to-do items using the `AddTodo` component. This includes input validation to ensure that users only add valid to-do items.
  * **Read**: The `TodoList` component displays the list of existing to-do items. It allows users to view all their current task.
  * **Update**: Users can change the names of their existing to-do items. This includes input validation to ensure that only valid updates are allowed.
  * **Delete**: Users can remove their existing to-do items. The app will prompt the user with confirmation dialog to ensure there are absolutly sure before deletion. This functionality uses the `Alert Dialog` component from **shadcn/ui** and **radix-ui**.

## **State management**
  * The project uses the **React Context API** for state management. This approach ensures efficient data flow without the need for prop drilling.
  * **Todo Context**: `Todo Provider` component wraps around the app. It provides the **todos** state and related functions to all consumer components. It allows them to access and manipulate the **todos** state.
## **Data structure**
  * The app stores a collection of to-do items in a global state of `TodoProvider` as an array.
  * Each of to-do items follows the next structure below.
  * The to-do items currently have a placeholder ID generated using `new Date().getTime()` for development.
  ```json
    {
      "id": <number>,
      "isCompleted": <boolean>,
      "name": <string>
    }
  ```
## **Validation**
  * Frontend validation helps to check the recently created to-do items.
## **State management**
## **Mark As Complete**
  * Users can mark existing to-do items as complete or incomplete. Completed to-do item are displayed with `checked` checkbox and `line-through` on the to-do name.
## **Styling**
  * **Tailwind CSS, shadcn/ui, lucide-react**: The project utilizes **Tailwind CSS** alongside **shadcn/ui** and **lucide-react** to enhance visual consistency and design.
  * **shadcn/ui**: It builds on top of `radix-ui` components for additional functionality.
  * **Responsive design**: Ensure an optimal UI/UX experience across various devices.