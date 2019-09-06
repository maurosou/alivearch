<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Edificio extends CI_Controller {

	function __construct() {
		parent::__construct();
		
		$this->post = ConfigAPI();
	}
	
	public function index()
	{
		$this->load->model('Edificio_model', 'edificio');
        
        $edifios = $this->edificio->Carregar();

        echo json_encode($edifios);
	}
}
