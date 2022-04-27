const States = require('../model/States');
const statesJson = require('../model/states.json');

// GET requests

// /states/ (return all state data)
const getAllStateData = (req, res) => 
{
    res.json(statesJson);
}

// /states/?contig=true All state data for contiguous states (Not AK or HI)
const getContiguousStateData = async (req, res) =>
{
  //TODO:
  console.log("TODO");
}

// /states/?contig=false All state data for non-contiguous states (AK, HI)
const getNonContiguousStateData = async (req, res) =>
{
  //TODO:
  console.log("TODO");
}

// /states/:state (All data for the state URL parameter)
const getState = async (req, res) => 
{
    if (!req?.params?.state) return res.status(400).json({ message: "State code is required."});
    
    const state = statesJson.find((state) => state.code === req.params.state);

    if (!state) return res.status(400).json({message: "State does not exist."});

    const jsonResults = await States.find({ statecode: req.params.state });

    res.json(state);
  };

// /states/:state/funfact A random fun fact for the state URL parameter
const getRandomFunFact = async (req, res) =>
{
  const state = await States.findOne({ stateCode: req.params.state });
  const funFacts = state?.funfacts;

  // If no fun facts are found
  if (!funFacts) 
  {
    const stName = statesJson.find
    (
      (state) => state.code === req.params.state
    ).state;

  res.json({message: `No fun facts found for ${stName}`});
} 

  else 
  {
    const randomFunFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    res.json
    ({
      funfact: randomFunFact,
    });
  }
};

// /states/:state/capital { ‘state’: stateName, ‘capital’: capitalName }
const getCapital = (req, res) => 
{
    if (!req?.params?.state) return res.status(400).json({ message: "State code is required"});
  
    const state = statesJson.find((state) => state.code === req.params.state);

    if (!state) return res.status(400).json({message: "State does not exist."});
  
    res.json({
      state: state.state,
      capital: state.capital_city,
    });
  };

  // /states/:state/nickname { ‘state’: stateName, ‘nickname’: nickname }
  const getNickname = (req, res) => 
  {
    if (!req?.params?.state) 
    {
        return res.status(400).json({ message: "State code is required"});
    }
  
    const state = statesJson.find((state) => state.code === req.params.state);
  
    res.json({
      state: state.state,
      nickname: state.nickname,
    });
  };

  // /states/:state/population { ‘state’: stateName, ‘population’: population }
  const getPopulation = (req, res) => 
  {
    if (!req?.params?.state)  return res.status(400).json({message: "State code is required"});
  
    const state = statesJson.find((state) => state.code === req.params.state);
  
    res.json({
      state: state.state,
      population: state.population,
    });
  };

  // /states/:state/admission { ‘state’: stateName, ‘admitted’: admissionDate }
  const getAdmission = (req, res) => 
  {
    if (!req?.params?.state) 
    {
        return res.status(400).json({message: "State code is required"});
    }
  
    const state = statesJson.find((state) => state.code === req.params.state);
  
    res.json({
      state: state.state,
      admitted: state.admission_date,
    });
  };

// POST request

// /states/:state/funfact The result received from MongoDB
const createNewFunFact = async (req, res) => 
{
    if (!req?.body?.funfacts) return res.status(400).json({message: "Fun fact is required."});

    if (!Array.isArray(req.body.funfacts)) 
    {
      return res.status(400).json({message: "Must be an array"});
    }

    const state = await States.findOne({ stateCode: req.params.state }).exec();

    if (state) 
    {
      state.funfacts.push(...req.body.funfacts);
  
      const savedEntry = await state.save();
  
      res.json(savedEntry);
    } 

    else 
    {
      try 
      {
        const savedEntry = await States.create
        ({
          stateCode: req.params.state,
          funfacts: [...req.body.funfacts],
        });
  
        res.status(201).json(savedEntry);
      } 

      catch (error) 
      {
        console.log(error);
      }
    }
  };

// PATCH request

// /states/:state/funfact The result received from MongoDB

const replaceFunFact = async (req, res) =>
{
  const index = req?.body?.index;
  const stCode = req?.params?.state;
  const funfact = req?.body?.funfact;

  if (!index) 
  {
    return res.status(400).json
    (
      {
        message: "Index required.",
      }
    );
  }
  if (!funfact) 
  {
    return res.status(400).json(
      {
        message: "Fun fact required.",
      }
    );
  }

  const state = await States.findOne({stateCode: stCode}).exec();

  if (!state) // No funfact found
  {
    // Map the name of the state with the state code
    const stateName = statesJson.find
    (
      (state) => state.code === stCode
    ).state;

    res.json({message: `No fun facts found for ${stateName}`});
  } 
  else if (!state.funfacts[index]) 
  {
    const stateName = statesJson.find
    (
      (state) => state.code === stCode
    ).state;

    res.json({message: `No fun facts found at index ${index} for ${stateName}`});
  } 
  else 
  {
    // Modify the found entry
    state.funfacts[index] = funfact;

    // Save the modified entry
    const result = await state.save();

    // Return the saved results
    res.json(result);
  }
}

// DELETE request

// /states/:state/funfact The result received from MongoDB
const deleteFunFact = async (req, res) =>
{
  // TODO:
  console.log("TODO");
}


module.exports = {

    getAllStateData,
    getContiguousStateData,
    getNonContiguousStateData,
    getRandomFunFact,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    createNewFunFact,
    replaceFunFact,
    deleteFunFact
}