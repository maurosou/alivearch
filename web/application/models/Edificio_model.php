<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Edificio_model extends CI_Model
{
    public function __construct()
    {       
        parent::__construct();
    }
    
    public function Carregar($id = null)
    {
        if($id != null)
            $this->db->where('id_edificio', $id);
        
        $query = $this->db->get('edificio');
       
        return $query->result_array();
    }
    
    public function Adicionar($dados)
    {
        $this->db->insert('edificio', $dados);
        return $this->db->insert_id();
    }
    
    public function Editar($id, $data)
    {
        if(is_null($id) || !isset($data))
            return false;
        
        $this->db->where('id_edificio', $id);

        return $this->db->update('edificio', $data);
    }
    

}

?>