import { useEffect, useState } from "react";
import terminal from "virtual:terminal";
import { Progress } from "@/components/ui/progress";

const ActionTimeout = ({callback}) => {
  const timeout = 30000;
  const [progress, setProgress] = useState(0);
  const interval = 5

  useEffect( () => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 
        ? callback() 
        : prevProgress+interval));
    }, timeout/(100/interval));
    return () => {
      clearInterval(timer);
    };
  }, [])

  return (
    <div>
      <p>Time Remaining:</p>
      <Progress className="w-full" value={progress}/>
    </div>
  )
}

export default ActionTimeout;