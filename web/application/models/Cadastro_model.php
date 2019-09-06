<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cadastro_model extends CI_Model
{
    public function __construct()
    {       
        parent::__construct();
    }
    
    public function Carregar($id = null)
    {
        if($id != null)
            $this->db->where('id_usuario', $id);
        
        $query = $this->db->get('usuario');
       
        return $query->result_array();
    }
    
    public function Adicionar($dados)
    {
        $this->db->insert('usuario', $dados);
        return $this->db->insert_id();
    }
    
    public function Editar($id, $data)
    {
        if(is_null($id) || !isset($data))
            return false;
        
        $this->db->where('id_usuario', $id);

        return $this->db->update('usuario', $data);
    }
    
    function ValidarMobile($form)
    {
        $str = "";
        
        if($form["email"] == "") {
            $str .= "E-mail deve ser preenchido\n";
        } else {
            if(!validaEmail($form["email"])) {
                $str .= "E-mail inválido\n";
            } else {
                if($this->EmailJaExiste($form["email"]))
                    $str .= "E-mail já cadastrado\n";
            }
        }

        if($form["senha"] == "") {
            $str .= "Senha deve ser preenchida\n";
        }             
        
        return $str;
    }

    function EmailJaExiste($email)
    {
        $this->db->where('email', $email);

        $query = $this->db->select("COUNT(*) as total");

        $query = $this->db->get('usuario');

        $obj = $query->row();

        return ($obj->total > 0);
    }

    public function CarregarPorEmail($email)
    {
        $this->db->where('email', $email);
        
        $query = $this->db->get('usuario');
       
        return $query->row();
    }

}

?>