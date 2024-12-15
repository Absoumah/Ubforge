package com.ubforge.ubforge.events;

import org.springframework.context.ApplicationEvent;
import com.ubforge.ubforge.model.Task;

public class TaskStatusChangedEvent extends ApplicationEvent {
    private final Task task;

    public TaskStatusChangedEvent(Object source, Task task) {
        super(source);
        this.task = task;
    }

    public Task getTask() {
        return task;
    }
}