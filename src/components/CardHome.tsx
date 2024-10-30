"use client";

import { Person } from "@/types/Person";
import { Summary } from "@/types/Summary";
import {
  MinusCircleOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Alert, Button, Card, Divider, Flex, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Text from "antd/es/typography/Text";
import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CardHomeComponents: React.FC = () => {
  // State
  const [people, setPeople] = useState<Person[]>([{ name: "", amount: 0 }]);
  const [promo, setPromo] = useState<number>(0);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [summary, setSummary] = useState<Summary | null>(null);

  // Function
  const handleAddPerson = () => {
    setPeople([...people, { name: "", amount: 0 }]);
  };

  const handleRemovePerson = (index: number) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
  };

  const handleCalculate = () => {
    const totalAmount = people.reduce((acc, person) => acc + person.amount, 0);
    const finalAmount = totalAmount - promo + additionalCosts + shippingCost;
    const individualBreakdown = people.map((person) => {
      const personShare = Math.round(
        (person.amount / totalAmount) * finalAmount,
      );
      return {
        ...person,
        share: personShare,
      };
    });

    setSummary({
      finalAmount: new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(finalAmount),
      breakdown: individualBreakdown,
    });
  };

  const handleReset = () => {
    setPeople([{ name: "", amount: 0 }]);
    setPromo(0);
    setAdditionalCosts(0);
    setShippingCost(0);
    setSummary(null);
  };

  return (
    <Flex vertical gap={14}>
      <Card bordered={false} style={{ width: "52rem" }}>
        <Flex justify="right" style={{ width: "100%" }}>
          <Button
            color="primary"
            variant="solid"
            icon={<RedoOutlined />}
            iconPosition="end"
            onClick={handleReset}
            style={{ marginTop: 1, textAlign: "right" }}
            disabled={!summary}
          >
            Reset
          </Button>
        </Flex>

        <Flex vertical justify="center">
          <Divider variant="dashed" style={{ borderColor: "#1677ff" }} dashed>
            Item Purchased By Persons
          </Divider>

          <TransitionGroup>
            {people.map((person, index) => (
              <CSSTransition key={index} timeout={300} classNames="fade">
                <Form
                  layout="inline"
                  autoComplete="off"
                  style={{ width: "100%", gap: 10, marginBottom: 10 }}
                >
                  <FormItem
                    rules={[{ required: true }]}
                    style={{ flex: 1, margin: 0 }}
                  >
                    <Input
                      placeholder="Person Name"
                      value={person.name}
                      onChange={(e) => {
                        const updatedPeople = [...people];
                        updatedPeople[index].name = e.target.value;
                        setPeople(updatedPeople);
                      }}
                    />
                  </FormItem>
                  <FormItem
                    rules={[{ required: true }]}
                    style={{ flex: 1, margin: 0 }}
                  >
                    <Input
                      prefix={<Text>Rp. </Text>}
                      placeholder="Amount (IDR)"
                      value={person.amount}
                      onChange={(e) => {
                        const updatedPeople = [...people];
                        updatedPeople[index].amount =
                          parseFloat(e.target.value) || 0;
                        setPeople(updatedPeople);
                      }}
                    />
                  </FormItem>
                  {index !== 0 && (
                    <MinusCircleOutlined
                      onClick={() => handleRemovePerson(index)}
                    />
                  )}
                </Form>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <Button
            color="primary"
            variant="solid"
            icon={<PlusCircleOutlined />}
            iconPosition="end"
            onClick={handleAddPerson}
            style={{ marginTop: 1 }}
          >
            Add Another Person
          </Button>

          <Divider variant="dashed" style={{ borderColor: "#1677ff" }} dashed>
            Additional Cost
          </Divider>

          <Alert
            message="Perhatian"
            description="Jika anda tidak memiliki Additional Cost, anda bisa mengosongkan inputan dibawah ini."
            type="warning"
            showIcon
            closable={false}
          />

          <Form
            layout="vertical"
            autoComplete="off"
            style={{ width: "100%", gap: 10, marginBottom: 10, marginTop: 14 }}
          >
            <FormItem label="Promo Cost (IDR)" style={{ flex: 1 }}>
              <Input
                prefix={<Text>Rp. </Text>}
                placeholder="Promo Cost (IDR)"
                value={promo}
                onChange={(e) => setPromo(parseFloat(e.target.value) || 0)}
              />
            </FormItem>
            <FormItem label="Other Cost (IDR)" style={{ flex: 1 }}>
              <Input
                prefix={<Text>Rp. </Text>}
                placeholder="Other Cost (IDR)"
                value={additionalCosts}
                onChange={(e) =>
                  setAdditionalCosts(parseFloat(e.target.value) || 0)
                }
              />
            </FormItem>
            <FormItem label="Shipping Cost (IDR)" style={{ flex: 1 }}>
              <Input
                prefix={<Text>Rp. </Text>}
                placeholder="Shipping Cost (IDR)"
                value={shippingCost}
                onChange={(e) =>
                  setShippingCost(parseFloat(e.target.value) || 0)
                }
              />
            </FormItem>
          </Form>

          <Button
            color="primary"
            variant="solid"
            icon={<PlayCircleOutlined />}
            iconPosition="end"
            onClick={handleCalculate}
            style={{ marginTop: 1 }}
          >
            Start Calculation
          </Button>
        </Flex>
      </Card>

      <TransitionGroup>
        {summary && (
          <CSSTransition timeout={300} classNames="fade">
            <Card bordered={false} style={{ width: "52rem" }}>
              <Flex vertical justify="center">
                <Divider
                  variant="dashed"
                  style={{ borderColor: "#1677ff" }}
                  dashed
                >
                  Summary
                </Divider>
                <div>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      vertical
                      justify="space-between"
                      style={{ width: "100%" }}
                    >
                      {summary.breakdown.map((breakdownSummary, index) => (
                        <Flex
                          key={index}
                          justify="space-between"
                          style={{ width: "100%" }}
                        >
                          <Text style={{ fontSize: 16 }}>
                            {breakdownSummary.name}
                          </Text>
                          <Text style={{ fontSize: 16, fontWeight: 700 }}>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(breakdownSummary.share)}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>

                  <Divider
                    variant="dashed"
                    style={{ borderColor: "#1677ff" }}
                    dashed
                  ></Divider>

                  <Flex justify="space-between" style={{ width: "100%" }}>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>
                      Total Final After Discount
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 700 }}>
                      {summary.finalAmount}
                    </Text>
                  </Flex>
                </div>
              </Flex>
            </Card>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Flex>
  );
};

export default CardHomeComponents;
