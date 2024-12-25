class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:create]

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

  private

  def set_todo
    @todo = ToDo.find(params[:id])
  end

  # Parâmetros permitidos para o ToDo
  def todo_params
    params.require(:todo).permit(:title, :description)
  end
end
