const express = require('express');
const { getPrograms, 
		getProgramById, 
		createProgram,
		deleteProgramById } = require('../controllers/programs-controller');

const router = express.Router();

router.get('/', getPrograms);
router.get('/:id', getProgramById);
router.post('/', createProgram);
router.delete('/:id', deleteProgramById);
router.put('/:id', updateProgramById); 

module.exports = router;