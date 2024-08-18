# Features

## **Core CRUD Functionality**:
  * **Create**: Users can add new to-do items using the `AddTodo` component. This includes input validation to ensure that users only add valid to-do items.
  * **Read**: The `TodoList` component displays the list of existing to-do items. It allows users to view all their current task.
  * **Update**: Users can change the names of their existing to-do items. This includes input validation to ensure that only valid updates are allowed.
  * **Delete**: (Planned) Users will be able to remove their existing to-do items from the list.
## **Validation**:
  * Frontend validation helps to check the recently created to-do items.
## **State management**:
  * The project uses the **React Context API** for state management. This approach ensures efficient data flow without the need for prop drilling.
  * **Todo Context**: `Todo Provider` component wraps around the app. It provides the **todos** state and related functions to all consumer components. It allows them to access and manipulate the **todos** state.
## **Styling**:
  * **Tailwind CSS, shadcn/ui, lucide-react**: The project utilizes **Tailwind CSS** alongside **shadcn/ui** and **lucide-react** to enhance visual consistency and design.
  * **Responsive design**: Ensure an optimal UI/UX experience across various devices.