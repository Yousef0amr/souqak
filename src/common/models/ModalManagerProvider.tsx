"use client";
import { useModalStore } from "@/shared/stores/DynamicModalStore";
import { DynamicModalContent } from "./DynamicModalContent";

const ModalManagerProvider = () => {
  const isOpen = useModalStore((state) => (state.isOpen));
  return isOpen ? <DynamicModalContent /> : null;
};

export default ModalManagerProvider;
