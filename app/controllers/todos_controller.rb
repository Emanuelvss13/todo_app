class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy,]
  skip_before_action :verify_authenticity_token, only: [:create, :destroy, :mark_as_completed]

  # GET /todos
  def index
    @todos = ToDo.includes(:tasks).all
    render json: @todos, include: :tasks
  end

  # GET /todos/:id
  def show
    render json: @todo, include: :tasks
  end

  # POST /todos
  def create
    @todo = ToDo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.update(todo_params)
      render json: @todo, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
    head :no_content
  end

  # PATCH /todos/:id/mark_as_completed
  def mark_as_completed
    @todo = ToDo.find(params[:id])
    puts @todo
    ActiveRecord::Base.transaction do
      @todo.update(status: 'completed')
      @todo.tasks.update_all(completed: true)
    end
    render json: @todo, include: :tasks, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def set_todo
    @todo = ToDo.find(params[:id])
    render json: { error: 'Todo not found' }, status: :not_found unless @todo
  end

  def todo_params
    params.require(:todo).permit(:title, :description, :status)
  end
end
