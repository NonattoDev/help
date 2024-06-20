"use client";
import { Dia, Materia, Professor, Turno } from "@/interfaces/professor.interface";
import axios from "axios";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import createEmptyProfessor from "./CreateEmptyProf";
import ReactInputMask from "react-input-mask";
import LoadingButton from "@/components/Buttons/LoadingButton";
import { validateCPF } from "@/utils/validateCpf";
import { Series } from "@/interfaces/series.interface";
import Pica from "pica";
import verifyPassword from "@/utils/VerifyPassword";
import moment from "moment";

interface CreateProfessorProps {
  materias: Materia[];
  series: Series[];
}

export default function CreateProfessor({ materias, series }: CreateProfessorProps) {
  const [formData, setFormData] = React.useState<Professor>(createEmptyProfessor());
  const [loading, setLoading] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const pica = Pica();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file?.type !== "image/jpeg" && file?.type !== "image/png" && file?.type !== "image/jpg") {
      toast.error("Formato de imagem inválido. Por favor, selecione uma imagem no formato .jpeg ou .png ou .jpg");
      return;
    }

    if (file) {
      try {
        const resizedImage = await resizeImage(file, 300, 300);
        const base64 = await getBase64(resizedImage);
        setFormData((prev) => ({ ...prev, img_url: base64 }));
      } catch (error) {
        console.log("Erro ao redimensionar a imagem", error);
      }
    }
  };

  const resizeImage = (file: File, width: number, height: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        pica
          .resize(img, canvas, {
            quality: 3,
          })
          .then((result: any) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, { type: file.type });
                resolve(resizedFile);
              } else {
                reject(new Error("Erro ao criar blob"));
              }
            }, file.type);
          })
          .catch((error: any) => {
            reject(error);
          });
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev };
      setNestedValue(newFormData, name, value);
      return newFormData;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev };
      setNestedValue(newFormData, name, checked);
      return newFormData;
    });
  };

  function setNestedValue(obj: any, path: string, value: any) {
    const keys = path.split(".");
    const lastKey = keys.pop() as string;
    const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
    lastKey && (lastObj[lastKey] = value);
  }

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let errorCount = 0;

    if (!formData.modalidade.online && !formData.modalidade.presencial) {
      toast.info("Selecione ao menos uma modalidade");
      errorCount = errorCount + 1;
    }

    if (formData.materias.length === 0) {
      toast.info("Selecione ao menos uma matéria");
      errorCount = errorCount + 1;
    }

    if (formData.turmas_habilitadas.length === 0) {
      toast.info("Selecione ao menos uma turma");
      errorCount = errorCount + 1;
    }

    if (!validateCPF(formData.cpf)) errorCount++;

    if (formData.areaFormacao.length > 0) {
      for (const formacao of formData.areaFormacao) {
        if (formacao.semestre === "") {
          formacao.semestre = "1";
        }
      }
    }

    if (formData.password !== confirmPassword) {
      toast.error("As senhas não conferem");
      errorCount = errorCount + 1;
    } else {
      if (!verifyPassword(formData.password)) errorCount++;
    }

    if (errorCount > 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`/help/admin/factory/create/api/`, { formData, typeEdit: "professor" });

      if (response.status === 200) {
        toast.success("Professor cadastrado com sucesso!");
        setFormData(createEmptyProfessor());
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Erro ao atualizar dados");
    }
  };

  const fetchCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cep = value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    if (data.erro) {
      toast.info("CEP não encontrado");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      },
    }));
  };

  const handleMateriasChange = (materia: string) => {
    setFormData((prev) => {
      const newMaterias = prev.materias.includes(materia) ? prev.materias.filter((materiaName) => materiaName !== materia) : [...prev.materias, materia];
      return { ...prev, materias: newMaterias };
    });
  };

  const handleTurmasChange = (turmaName: string) => {
    setFormData((prevData) => {
      const newTurmas = prevData.turmas_habilitadas.includes(turmaName) ? prevData.turmas_habilitadas.filter((turma) => turma !== turmaName) : [...prevData.turmas_habilitadas, turmaName];
      return { ...prevData, turmas_habilitadas: newTurmas };
    });
  };

  return (
    <div>
      <form onSubmit={submitCreate}>
        <div id="profilePic" className="flex justify-between items-center">
          <div className="avatar ml-5 flex">
            <div className="w-24 rounded-full flex cursor-pointer" onClick={() => document.getElementById("fileInput")?.click()}>
              <img src={formData.img_url || "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"} alt="Profile" />
            </div>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} accept="image/png, image/jpeg" />
          </div>
          <h2 className="text-md text-center font-bold mb-5 align-middle">Dados Pessoais</h2>
          <div className="w-24 mr-5"></div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <ReactInputMask
              mask={"999.999.999-99"}
              maskPlaceholder={null}
              alwaysShowMask={false}
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Data de Nascimento</span>
            </label>
            <input type="date" name="data_nascimento" value={moment(formData.data_nascimento).format("YYYY-MM-DD")} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telefone</span>
            </label>
            <ReactInputMask
              mask="(99) 99999-9999"
              alwaysShowMask={false}
              maskPlaceholder={null}
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirme a senha</span>
            </label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input input-bordered" required />
          </div>
        </div>

        <div id="enderecoDiv" className="mt-8">
          <h2 className="text-md text-center font-bold mb-5">Endereço</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="label">
                <span className="label-text">CEP</span>
              </label>
              <ReactInputMask
                mask={"99999999"}
                alwaysShowMask={false}
                maskPlaceholder={null}
                onBlur={(e) => fetchCep(e)}
                type="text"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Rua</span>
              </label>
              <input type="text" name="endereco.rua" value={formData.endereco.rua} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Número</span>
              </label>
              <input type="text" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Complemento</span>
              </label>
              <input type="text" name="endereco.complemento" value={formData.endereco.complemento} onChange={handleChange} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Bairro</span>
              </label>
              <input type="text" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Cidade</span>
              </label>
              <input type="text" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Estado</span>
              </label>
              <input type="text" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Referência</span>
              </label>
              <input type="text" name="endereco.referencia" value={formData.endereco.referencia} onChange={handleChange} className="input input-bordered w-full" />
            </div>
          </div>
        </div>

        <div className="form-control mt-8">
          <h2 className="text-md text-center font-bold mb-5">Área de Formação</h2>
          {formData.areaFormacao.map((area, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-5">
              <input placeholder="Curso" type="text" name={`areaFormacao.${index}.area`} value={area?.area} onChange={handleChange} className="input input-bordered" required />
              <select name={`areaFormacao.${index}.semestre`} value={area?.semestre || 1} onChange={handleChange} className="input input-bordered" required>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((semestre) => (
                  <option key={semestre} value={semestre}>
                    {semestre}º Semestre
                  </option>
                ))}
              </select>
              <div className="flex gap-16">
                <label className="label cursor-pointer space-x-2 w-fit">
                  <input
                    type="checkbox"
                    name={`areaFormacao.${index}.finalizado`}
                    checked={area?.finalizado}
                    onChange={() => {
                      const newAreaFormacao = [...formData.areaFormacao];
                      newAreaFormacao[index].finalizado = !area.finalizado;
                      setFormData({ ...formData, areaFormacao: newAreaFormacao });
                    }}
                    className="checkbox"
                  />
                  <span className="label-text">Finalizado</span>
                </label>
                <button className="btn w-fit btn-error" type="button" onClick={() => setFormData({ ...formData, areaFormacao: formData.areaFormacao.filter((_, i) => i !== index) })}>
                  <BiTrash color="#FFF" />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, areaFormacao: [...formData.areaFormacao, { area: "", semestre: "1", finalizado: false }] });
            }}
            className="btn btn-secondary w-fit mx-auto block"
          >
            Adicionar Formação
          </button>
        </div>

        <div className="form-control mt-8">
          <h2 className="text-md text-center font-bold mb-5">Modalidade</h2>
          <label className="flex items-center cursor-pointer ">
            <span className="text-md mr-2">Online</span>
            <input type="checkbox" name="modalidade.online" checked={formData?.modalidade?.online} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
          </label>
          <label className="flex items-center cursor-pointer">
            <span className="text-md mr-2">Presencial</span>
            <input type="checkbox" name="modalidade.presencial" checked={formData?.modalidade?.presencial} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
          </label>
        </div>

        <div className="form-control mt-8">
          <h2 className="text-md text-center font-bold mb-5">Disponibilidade</h2>
          {["segunda", "terca", "quarta", "quinta", "sexta", "sabado"].map((dia) => (
            <div key={dia} className="mb-5">
              <h3 className="text-sm font-bold mb-5 mt-5 text-center">{dia.charAt(0).toUpperCase() + dia.slice(1)}</h3>
              <div className="flex justify-around">
                {["manha", "tarde", "noite"].map((turno) => (
                  <label key={turno} className="flex items-center cursor-pointer">
                    <span className="text-sm mr-2">{turno.charAt(0).toUpperCase() + turno.slice(1)}</span>
                    <input
                      type="checkbox"
                      name={`disponibilidade.${dia}.${turno}`}
                      checked={formData.disponibilidade[dia as Dia][turno as Turno]}
                      onChange={handleCheckboxChange}
                      className="checkbox"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div id="materias" className="mt-8">
          <h2 className="text-md text-center font-bold mb-5">Matérias</h2>
          <div className="grid grid-cols-4 gap-4 ">
            {materias.map((materia) => (
              <label key={materia.id} className="flex items-center cursor-pointer">
                <input type="checkbox" name={`materias`} checked={formData.materias.includes(materia.materia)} onChange={() => handleMateriasChange(materia.materia)} className="checkbox" />
                <span className="label-text ml-2">{materia.materia}</span>
              </label>
            ))}
          </div>
        </div>

        <div id="turmas_habilitadas" className="mt-8">
          <h2 className="text-md text-center font-bold mb-5">Turmas que está apto a lecionar</h2>
          <div className="grid grid-cols-4 gap-4">
            {series.map((serie) => (
              <label key={serie.id} className="flex items-center cursor-pointer">
                <input type="checkbox" name="turmas_habilitadas" onChange={() => handleTurmasChange(serie.serie)} className="checkbox" />
                <span className="label-text ml-2">{serie.serie}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          {loading ? (
            <LoadingButton />
          ) : (
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
