<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Conta extends CI_Controller {

	function __construct() {
		parent::__construct();
		
		$this->post = ConfigAPI();
	}
	
	public function index()
	{
		$this->load->model('conta_model', 'conta');
        
        $conta = $this->conta->VerificarRetornar($this->post["email"], $this->post["senha"]);

        if($conta != null)
        {
            echo json_encode([ "erro" => false, "usuario" => $conta ]);
        }
        else
        {
            echo json_encode([ "erro" => true, "mensagem" => "Usuário não encontrado" ]);
        }
	}

	public function adicionar()
    {
        $this->load->model('cadastro_model', 'cadastro');
		
        $validar = $this->cadastro->ValidarMobile($this->post);
		
        if($validar == "") {
            $dados['email'] = $this->post["email"];
            $dados['senha'] = $this->post["senha"];

            $id = $this->cadastro->Adicionar($dados);

			$cliente = $this->cadastro->Carregar($id);
			
			$this->load->library("My_PHPMailer");

			$mail = new PHPMailer();
			$mail->IsSMTP();
			$mail->SMTPAuth = true;
			$mail->SMTDebug = 2;
			$mail->SMTPSecure = "tls";
			$mail->Host = "mail.agenciacolateral.com.br";
			$mail->Port = 587;
			$mail->Username = "envio@agenciacolateral.com.br";
			$mail->Password = "envio";
			
			$mail->SetFrom('contato@alivearch.com.br', 'Alivearch');
			$mail->Subject = "Alivearch";
			$mail->IsHTML(true);    
			$mail->Body = "Cadastro efetuado com sucesso";
			$destino = $this->post["email"] ;
			$mail->AddAddress($destino, $this->post["email"]);

			$mail->Send();
			
			echo json_encode([ "erro" => false, "usuario" => $cliente[0] ]);
		} 
		else
		{
			echo json_encode([ "erro" => true, "mensagem" => $validar ]);
		}
	}

	public function esqueci()
	{
		$this->load->model("cadastro_model",'cadastro');

		$usuario = $this->cadastro->CarregarPorEmail($this->post["email"]);
		
		$obj = [];

		if($usuario != null)
		{
			$rand = mt_rand(1000, 9999);
			$obj = ["erro" => false, "id_usuario" => $usuario->id_usuario, "codigo" => $rand, "mensagem" => "Você recebera um email com um código. Informe-o a seguir para poder alterar a senha."];

			$this->load->library("My_PHPMailer");

			$mail = new PHPMailer();
			$mail->IsSMTP();
			$mail->SMTPAuth = true;
			$mail->SMTDebug = 2;
			$mail->SMTPSecure = "tls";
			$mail->Host = "mail.agenciacolateral.com.br";
			$mail->Port = 587;
			$mail->Username = "envio@agenciacolateral.com.br";
			$mail->Password = "envio";
			
			$mail->SetFrom('contato@alivearch.com.br', 'Alivearch');
			$mail->Subject = "Senha - Alivearch";
			$mail->IsHTML(true);    
			$mail->Body = "
			Prezado	Usuário. <br>
			Infome o código $rand para alterar sua senha.";
			$destino = $usuario->email ;
			$mail->AddAddress($destino, $usuario->email );

			$mail->Send();
		}
		else
		{
			$obj = ["erro" => true, "mensagem" => "Usuário não encontrado"];
		}

		echo json_encode($obj);
	}

	public function novaSenha()
	{

		$this->load->model('cadastro_model', 'cadastro');

		$dados['senha'] = $this->post["senha"];
		
		$this->cadastro->Editar($this->post["id"], $dados);
		
		echo json_encode(true);
	}
}
