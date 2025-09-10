import { DragEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../stores/store';
import { useAddTaskToSectionMutation } from '../api/tasksApi';
import { DROP_DISTANCE_OFFSET } from '../constants';
import { moveTask } from '../stores/tasksSlice';

export const useColumnDragAndDrop = (sectionGid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [moveTaskToSection] = useAddTaskToSectionMutation();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (
    event: DragEvent<HTMLElement>,
    taskGid: string,
    sectionGid: string
  ) => {
    event.dataTransfer.setData('taskGid', taskGid);
    event.dataTransfer.setData('sectionGid', sectionGid);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = async (event: DragEvent<HTMLDivElement>) => {
    const taskGid = event.dataTransfer.getData('taskGid');
    const oldSectionGid = event.dataTransfer.getData('sectionGid');
    const targetSectionGid =
      event.currentTarget.getAttribute('data-section-gid');
    setIsDraggingOver(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(event, indicators);

    const before = element.dataset.before || '-1';

    if (targetSectionGid && oldSectionGid && before !== taskGid) {
      try {
        dispatch(
          moveTask({
            fromSectionGid: oldSectionGid,
            toSectionGid: targetSectionGid,
            taskGid,
            before,
          })
        );
        await moveTaskToSection({
          sectionGid: targetSectionGid,
          taskGid,
          insert_before: before === '-1' ? null : before,
        }).unwrap();
      } catch (error) {
        console.error('Error moving task to section:', error);
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    highlightIndicator(event);
    event.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setIsDraggingOver(false);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((indicator) => {
      indicator.style.opacity = '0';
    });
  };

  const highlightIndicator = (event: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(event, indicators);

    el.element.style.opacity = '1';
  };

  const getNearestIndicator = (
    event: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = event.clientY - (box.top + DROP_DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${sectionGid}"]`)
    ) as HTMLElement[];
  };

  return {
    handleDragStart,
    isDraggingOver,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  };
};
