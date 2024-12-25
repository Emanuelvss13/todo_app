class TasksController < ApplicationController
  before_action :set_todo
  before_action :set_task, only: [:show, :update, :destroy, :mark_as_complete]
  skip_before_action :verify_authenticity_token, only: [:create, :mark_as_complete]

  def mark_as_complete
    if @task.update(completed: true)
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def index
    @tasks = @todo.tasks
    render json: @tasks
  end

  def show
    render json: @task
  end

  def create

    @task = @todo.tasks.build(task_params)
    if @task.save
      render json: @task, status: :created, location: todo_task_url(@todo, @task)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_todo
    @todo = ToDo.find_by(id: params[:todo_id])
    unless @todo
      render json: { error: "ToDo not found" }, status: :not_found
    end
  end

  def set_task
    @task = @todo.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :completed, :status)
  end
end
