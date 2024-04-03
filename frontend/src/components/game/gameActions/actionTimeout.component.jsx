import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import terminal from "virtual:terminal";

const ActionTimeout = ({callback}) => {
  const timeout = 10000;
  const [progress, setProgress] = useState(0);
  let i = 0;

  const onTimerComplete = () => {
    setProgress(100);
    callback();
  }
  
  useEffect( () => {
    const timer = setTimeout((() => onTimerComplete()), timeout);
    return () => clearTimeout(timer);
  })

  return (
    <div>
      <p>Time Remaining:</p>
      <Progress value={progress} />
    </div>
  )
}

export default ActionTimeout;