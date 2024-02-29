import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from 'react';
import './style.css';

const QuranList = () => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [visitedSurahs, setVisitedSurahs] = useState([]);

  useEffect(()    => {
    fetch('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
      .then(response => response.json())
      .then(data => {
        setSurahList(Object.values(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSurahClick = (surah) => {
    setSelectedSurah(surah);
    setVisitedSurahs([...visitedSurahs, surah.nama]);


    // kirim data "visited surah" ke beckend
    
  };

  const closeModal = () => {
    setSelectedSurah(null);
  };

  return (
    <div className="container">
      <h1>Daftar Surah</h1>
      <div className="row">
        {surahList.map((surah, index) => (
          <div className="col-5 d-flex card-surah m-2" key={index}>
            <button className='p-1' onClick={() => handleSurahClick(surah)}>
              {surah.nama}
            </button>
          </div>
        ))}
      </div>

      {selectedSurah && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedSurah.nama}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{selectedSurah.arti}</p>
                <p>{selectedSurah.keterangan}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2>Daftar Surah yang di kunjungi</h2>
      <ul>
        {visitedSurahs.map((surah, index) => (
          <li key={index}>{surah}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuranList;

