import { motion } from "framer-motion";

export default function Inner({ children }: { children: React.ReactNode }) {
  const anim = (variants: any) => {
    return {
      initials: "initial",
      animate: "enter",
      exit: "exit",
      variants,
    };
  };
  const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
  };
  return (
    <motion.div {...anim(opacity)} className="page">
      {children}
    </motion.div>
  );
}
