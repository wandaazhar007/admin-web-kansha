export type SelectedType = {
  selected: number
}

export type ModalEditType = {
  closeModal: () => void,
  propId: number
}

export type CategoryMapType = {
  id: number,
  name: string,
  slug: string,
  createdAt: string
}

export type TriggerContextType = {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  trigger: () => void;
}

export type SidebarContextType = {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  triggerSidebar: () => void;
}