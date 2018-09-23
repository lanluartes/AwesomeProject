using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour {

	public GameObject flashText;

	// Use this for initialization
	void Start () {
			InvokeRepeating("flashTheText", 0f, 0.5f);
	}

	// Update is called once per frame
	void Update () {
		if(Input.GetMouseButtonUp (0))
				SceneManager.LoadScene("Game Scene");
	}

	void flashTheText(){
		if(flashText.activeInHierarchy)
				flashText.SetActive (false);
		else
				flashText.SetActive (true);
	}
}
