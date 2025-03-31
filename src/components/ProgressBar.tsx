import { useIsFetching } from "@tanstack/react-query";
import { useNavigation } from "react-router";

// const ProgressBar = () => {
//   const navigation = useNavigation();
//   const fetching = useIsFetching() > 0;

//   if (fetching || navigation.state !== "idle") {
//  navigation.state === "loading" A page transition is happening.
//  navigation.state === "submitting" A form submission is happening.
//     return (
//       <div className="fixed left-0 top-0 z-50 h-2.5 w-full overflow-hidden bg-gray-200">
//         <div className="animate-progress absolute h-full w-full rounded-r-lg bg-own" />
//       </div>
//     );
//   }
//   return null;
// };

// export default ProgressBar;

const ProgressBar = () => {
  const navigation = useNavigation();
  const fetching = useIsFetching() > 0;

  if (fetching || navigation.state !== "idle") {
    return (
      <div className="fixed left-0 top-0 w-full">
        <div className="h-1.5 w-full overflow-hidden bg-pink-100">
          <div className="loading-progress left-right h-full w-full bg-own" />
        </div>
      </div>
    );
  }

  return null;
};

export default ProgressBar;
