class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:create]


  # GET /todos
  def index
    @todos = ToDo.all

    respond_to do |format|
      format.html # Retorna a view HTML (se necessário)
      format.json { render json: @todos } # Responde com JSON
    end
  end

  # GET /todos/:id
  def show
    respond_to do |format|
      format.html # Retorna a view HTML (se necessário)
      format.json { render json: @todo } # Responde com JSON
    end
  end

  # POST /todos
  def create
    @todo = ToDo.new(todo_params)

    if @todo.save
      respond_to do |format|
        format.html { redirect_to @todo, notice: 'To-Do criado com sucesso.' }
        format.json { render json: @todo, status: :created } # Responde com JSON e status 201
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.json { render json: @todo.errors, status: :unprocessable_entity } # Retorna erros em JSON e status 422
      end
    end
  end

  # PATCH/PUT /todos/:id
  def update
    if @todo.update(todo_params)
      respond_to do |format|
        format.html { redirect_to @todo, notice: 'To-Do atualizado com sucesso.' }
        format.json { render json: @todo, status: :ok } # Responde com JSON e status 200
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity } # Retorna erros em JSON e status 422
      end
    end
  end

  # DELETE /todos/:id
  def destroy
    @todo.destroy
    respond_to do |format|
      format.html { redirect_to todos_url, notice: 'To-Do excluído com sucesso.' }
      format.json { head :no_content } # Responde com status 204 (sem conteúdo)
    end
  end

  private

  # Método para encontrar o ToDo pelo ID
  def set_todo
    @todo = ToDo.find(params[:id])
  end

  # Parâmetros permitidos para o ToDo
  def todo_params
    params.require(:todo).permit(:title, :description)
  end
end
