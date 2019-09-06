<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Conta_model extends CI_Model
{
    public function __construct()
    {       
        parent::__construct();
    }
    
    public function Verificar($email, $senha)
    {
        $this->db->where('email', $email);        
        $this->db->where('senha', $senha);
        
        $query = $this->db->get('usuario');
       
        return $query->result_array();
    }

    public function VerificarRetornar($email, $senha)
    {
        $this->db->where('email', $email);        
        $this->db->where('senha', $senha);
        
        $query = $this->db->get('usuario');
       
        return $query->row();
    }
}
?>